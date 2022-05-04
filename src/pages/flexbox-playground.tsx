import {
  ActionIcon,
  AppShell,
  Button,
  Divider,
  Group,
  Navbar,
  NumberInput,
  Popover,
  SegmentedControl,
  Slider,
  Stack,
  Tabs,
  Tooltip,
  Badge,
  Code,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import type { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import { ArrowUpCircle, Edit, Trash, X } from "tabler-icons-react"
import { APP_URL } from "../../constant"

const DEFAULT_ITEM: Item = {
  width: { type: "px" as const, value: 200 },
  grow: 0,
  shrink: 1,
  basis: { type: "auto" as const },
  alignSelf: "auto" as const,
}

type Item = {
  width:
    | {
        type: "auto"
        value?: undefined
      }
    | {
        type: "px" | "%"
        value: number
      }
  grow: number
  shrink: number
  basis:
    | {
        type: "auto" | "content"
        value?: undefined
      }
    | {
        type: "integer" | "px" | "%"
        value: number
      }
  alignSelf: "auto" | "flex-start" | "center" | "flex-end" | "stretch"
}

const ApplyAllButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Tooltip label="apply to all flex items" transition="fade">
    <ActionIcon onClick={onClick} size="xs" color="#a5a5a5">
      <ArrowUpCircle />
    </ActionIcon>
  </Tooltip>
)

const Home: NextPage = () => {
  const [direction, setDirection] = useState<"row" | "column" | "row-reverse" | "column-reverse">(
    "row",
  )
  const [alignItems, setAlignItems] = useState<"flex-start" | "center" | "flex-end" | "stretch">(
    "stretch",
  )
  const [justifyContent, setJustifyCntent] = useState<
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "stretch"
  >("stretch")
  const [wrap, setWrap] = useState<"nowrap" | "wrap" | "wrap-reverse">("nowrap")

  const [items, setItems] = useState<Item[]>([DEFAULT_ITEM, DEFAULT_ITEM, DEFAULT_ITEM])

  const [activeTab, setActiveTab] = useState<number | null>(null)
  const [activePopover, setActivePopover] = useState<number | null>(null)

  const deleteItem = (i: number) => {
    if (items.length <= 1) {
      showNotification({
        title: "エラー",
        message: "これ以上アイテムを削除できません",
        color: "red",
        icon: <X size={18} />,
        autoClose: 5,
      })
      return
    }
    setItems((prev) => {
      const newItems = [...prev]
      newItems.splice(i, 1)
      return newItems
    })
  }

  const ItemEdit = (item: Item, i: number) => (
    <Stack spacing="xl" align="flex-start">
      <div className="w-full">
        <Group position="apart" style={{ width: "100%" }}>
          <h2 className="typo-h3">Width</h2>
          <ApplyAllButton
            onClick={() =>
              setItems((prev) => {
                const target = prev[i]
                if (target == null) return prev
                return prev.map((item) => ({ ...item, width: target.width }))
              })
            }
          />
        </Group>

        <Stack align="flex-start">
          <SegmentedControl
            value={item.width.type}
            onChange={(value) =>
              setItems((prev) => {
                const newItems = [...prev]
                const target = prev[i]
                if (target == null) return prev
                const _value = value === "px" ? 100 : value === "%" ? 10 : undefined
                newItems.splice(i, 1, { ...target, width: { type: value as any, value: _value } })
                return newItems
              })
            }
            data={[
              { label: "auto", value: "auto" },
              { label: "px", value: "px" },
              { label: "%", value: "%" },
            ]}
          />

          <Group noWrap>
            <NumberInput
              value={item.width.value ?? 0}
              onChange={(value) =>
                setItems((prev) => {
                  const newItems = [...prev]
                  const target = prev[i]
                  if (target == null) return prev
                  newItems.splice(i, 1, {
                    ...target,
                    width: {
                      type: item.width.type as "%" | "px",
                      value: value ?? 0,
                    },
                  })
                  return newItems
                })
              }
              disabled={!(item.width.type === "px" || item.width.type === "%")}
              stepHoldDelay={500}
              stepHoldInterval={100}
              step={10}
              min={item.width.type === "%" ? 10 : 100}
              max={item.width.type === "%" ? 100 : 999}
            />
            {item.width.type !== "auto" && <p>{item.width.type}</p>}
          </Group>
        </Stack>
      </div>
      <div className="w-full  pb-4">
        <Group position="apart" style={{ width: "100%" }}>
          <h2 className="typo-h3">Flex grow</h2>
          <ApplyAllButton
            onClick={() =>
              setItems((prev) => {
                const target = prev[i]
                if (target == null) return prev
                return prev.map((item) => ({ ...item, grow: target.grow }))
              })
            }
          />
        </Group>
        <Slider
          value={item.grow}
          onChange={(value) => {
            setItems((prev) => {
              const newItems = [...prev]
              const target = prev[i]
              if (target == null) return prev
              newItems.splice(i, 1, { ...target, grow: value })
              return newItems
            })
          }}
          style={{ width: "200px" }}
          marks={Array(6)
            .fill(null)
            .map((_, i) => ({ value: i, label: i }))}
          min={0}
          max={5}
        />
      </div>
      <div className="w-full pb-4">
        <Group position="apart" style={{ width: "100%" }}>
          <h2 className="typo-h3">Flex shrink</h2>
          <ApplyAllButton
            onClick={() =>
              setItems((prev) => {
                const target = prev[i]
                if (target == null) return prev
                return prev.map((item) => ({ ...item, shrink: target.shrink }))
              })
            }
          />
        </Group>
        <Slider
          value={item.shrink}
          onChange={(value) =>
            setItems((prev) => {
              const newItems = [...prev]
              const target = prev[i]
              if (target == null) return prev
              newItems.splice(i, 1, { ...target, shrink: value })
              return newItems
            })
          }
          style={{ width: "200px" }}
          marks={Array(6)
            .fill(null)
            .map((_, i) => ({ value: i, label: i }))}
          min={0}
          max={5}
        />
      </div>
      <div className="w-full">
        <Group position="apart" style={{ width: "100%" }}>
          <h2 className="typo-h3">Flex basis</h2>
          <ApplyAllButton
            onClick={() =>
              setItems((prev) => {
                const target = prev[i]
                if (target == null) return prev
                return prev.map((item) => ({ ...item, basis: target.basis }))
              })
            }
          />
        </Group>
        <Stack align="flex-start">
          <SegmentedControl
            value={item.basis.type}
            onChange={(e) =>
              setItems((prev) => {
                const newItems = [...prev]
                const target = prev[i]
                if (target == null) return prev
                newItems.splice(i, 1, { ...target, basis: { type: e as any } })
                return newItems
              })
            }
            data={[
              { label: "auto", value: "auto" },
              { label: "content", value: "content" },
              { label: "<integer>", value: "integer" },
              { label: "px", value: "px" },
              { label: "%", value: "%" },
            ]}
          />
          <Group>
            <NumberInput
              value={item.basis.value ?? 0}
              onChange={(value) =>
                setItems((prev) => {
                  const newItems = [...prev]
                  const target = prev[i]
                  if (target == null) return prev
                  newItems.splice(i, 1, {
                    ...target,
                    basis: {
                      type: item.basis.type as "integer" | "%" | "px",
                      value: value ?? 0,
                    },
                  })
                  return newItems
                })
              }
              disabled={
                !(
                  item.basis.type === "px" ||
                  item.basis.type === "%" ||
                  item.basis.type === "integer"
                )
              }
              stepHoldDelay={500}
              stepHoldInterval={100}
              min={0}
              max={item.basis.type === "%" ? 100 : undefined}
            />
            {(item.basis.type === "px" || item.basis.type === "%") && <p>{item.basis.type}</p>}
          </Group>
        </Stack>
      </div>
      <div className="w-full">
        <Group position="apart" style={{ width: "100%" }}>
          <h2 className="typo-h3">Align self</h2>
          <ApplyAllButton
            onClick={() =>
              setItems((prev) => {
                const target = prev[i]
                if (target == null) return prev
                return prev.map((item) => ({ ...item, alignSelf: target.alignSelf }))
              })
            }
          />
        </Group>
        <SegmentedControl
          value={item.alignSelf}
          onChange={(value: typeof item.alignSelf) =>
            setItems((prev) => {
              const newItems = [...prev]
              const target = prev[i]
              if (target == null) return prev
              newItems.splice(i, 1, {
                ...target,
                alignSelf: value,
              })
              return newItems
            })
          }
          data={[
            { label: "auto", value: "auto" },
            { label: "flex-start", value: "flex-start" },
            { label: "center", value: "center" },
            { label: "flex-end", value: "flex-end" },
            { label: "stretch", value: "stretch" },
          ]}
        />
      </div>
      <Divider />
    </Stack>
  )

  return (
    <>
      <Head>
        <title>FlexBox playground</title>
        <meta property="og:url" content={APP_URL + "/flexbox-playground"} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="FlexBox playground" />
        <meta
          property="og:description"
          content="Flexbox playground | Check the behavior of Flexbox layout with GUI"
        />
        <meta property="og:site_name" content="Flexbox playground" />
        <meta property="og:image" content={APP_URL + "/ogp/flexbox-playground.png"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Selria1" />
      </Head>
      <AppShell
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
        navbar={
          <Navbar className="shrink-0 overflow-y-scroll p-4" width={{ base: 400 }} p="xs">
            <Stack spacing="lg">
              <h1 className="typo-h1">Flex Box</h1>
              <div>
                <h2 className="typo-h3">flex direction</h2>
                <SegmentedControl
                  value={direction}
                  onChange={(e) => setDirection(e as typeof direction)}
                  data={[
                    { label: "row", value: "row" },
                    { label: "column", value: "column" },
                    { label: "row-reverse", value: "row-reverse" },
                    { label: "column-reverse", value: "column-reverse" },
                  ]}
                />
              </div>
              <div>
                <h2 className="typo-h3">align items</h2>
                <SegmentedControl
                  value={alignItems}
                  onChange={(e) => setAlignItems(e as typeof alignItems)}
                  data={[
                    { label: "flex-start", value: "flex-start" },
                    { label: "center", value: "center" },
                    { label: "flex-end", value: "flex-end" },
                    { label: "stretch", value: "stretch" },
                  ]}
                />
              </div>
              <div>
                <h2 className="typo-h3">Jutify contents</h2>
                <SegmentedControl
                  value={justifyContent}
                  onChange={(e) => setJustifyCntent(e as typeof justifyContent)}
                  className="flex-wrap"
                  data={[
                    { label: "flex-start", value: "flex-start" },
                    { label: "center", value: "center" },
                    { label: "flex-end", value: "flex-end" },
                    { label: "space-around", value: "space-around" },
                    { label: "space-between", value: "space-between" },
                    { label: "space-evenly", value: "space-evenly" },
                    { label: "stretch", value: "stretch" },
                  ]}
                />
              </div>
              <div>
                <h2 className="typo-h3">Flex wrap</h2>
                <SegmentedControl
                  value={wrap}
                  onChange={(e) => setWrap(e as typeof wrap)}
                  data={[
                    { label: "nowrap", value: "nowrap" },
                    { label: "wrap", value: "wrap" },
                    { label: "wrap-reverse", value: "wrap-reverse" },
                  ]}
                />
              </div>
              <Divider my="sm" />
              <div>
                <Group position="apart">
                  <h1 className="typo-h1">Flex Item</h1>
                  <Button color="blue" onClick={() => setItems((prev) => [...prev, DEFAULT_ITEM])}>
                    Add flex item
                  </Button>
                </Group>
                <Tabs active={activeTab ?? 0} onTabChange={setActiveTab}>
                  {items.map((item, i) => (
                    <Tabs.Tab label={`Item${i + 1}`} key={i}>
                      <Stack spacing={0} align="flex-start">
                        {ItemEdit(item, i)}
                        <Button color="red" onClick={() => deleteItem(i)}>
                          Delete this item
                        </Button>
                      </Stack>
                    </Tabs.Tab>
                  ))}
                </Tabs>
              </div>
            </Stack>
          </Navbar>
        }
      >
        <div className="flex h-full w-full">
          <div
            className="h-full max-h-screen max-w-[820px] grow rounded border border-gray-300 p-2"
            style={{
              display: "flex",
              flexDirection: direction,
              alignItems,
              justifyContent,
              flexWrap: wrap,
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="m-2 min-h-[100px] min-w-[100px] overflow-scroll rounded border border-blue-300 bg-white p-2 shadow transition-all"
                style={{
                  width:
                    item.width.type === "auto" ? "auto" : `${item.width.value}${item.width.type}`,
                  flexGrow: item.grow,
                  flexShrink: item.shrink,
                  flexBasis:
                    item.basis.type === "auto" || item.basis.type === "content"
                      ? item.basis.type
                      : `${item.basis.value}${item.basis.type}`,
                  alignSelf: item.alignSelf,
                }}
              >
                <Group>
                  <p style={{ width: "60px" }}>Item {i + 1}</p>
                  <Popover
                    opened={activePopover === i}
                    onClose={() => setActivePopover(null)}
                    target={
                      <ActionIcon onClick={() => setActivePopover(i)} size="xs">
                        <Edit />
                      </ActionIcon>
                    }
                    position="bottom"
                    withArrow
                    // trapFocus={false}
                  >
                    {ItemEdit(item, i)}
                  </Popover>
                  <ActionIcon onClick={() => deleteItem(i)} size="xs">
                    <Trash />
                  </ActionIcon>
                </Group>
                <Code block style={{ lineHeight: 2 }} mt="sm">
                  width:{" "}
                  <Badge styles={{ inner: { textTransform: "none" } }}>
                    {item.width.value ?? ""} {item.width.type}
                  </Badge>
                  ;
                  <br />
                  flex-grow:{" "}
                  <Badge styles={{ inner: { textTransform: "none" } }}>{item.grow}</Badge>;
                  <br />
                  flex-shrink:{" "}
                  <Badge styles={{ inner: { textTransform: "none" } }}>{item.shrink}</Badge>;
                  <br />
                  flex-basis:{" "}
                  <Badge styles={{ inner: { textTransform: "none" } }}>
                    {item.basis.value ?? ""} {item.basis.type === "integer" ? "" : item.basis.type}
                  </Badge>
                  ;
                  <br />
                  align-self:{" "}
                  <Badge styles={{ inner: { textTransform: "none" } }}>{item.alignSelf}</Badge>;
                </Code>
              </div>
            ))}
          </div>
        </div>
      </AppShell>
    </>
  )
}

export default Home
