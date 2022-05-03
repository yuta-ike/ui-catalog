import { GetServerSideProps } from "next"

const Index: React.FC = () => {
  return <div>Redirect to /flexbox-playgound soon...</div>
}

export default Index

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/flexbox-playground",
      permanent: false,
    },
  }
}
