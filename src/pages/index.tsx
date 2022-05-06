export async function getStaticProps() {
  return {
    redirect: {
      destination: '/stars/0',
      permanent: false,
    },
  };
}
