import Head from 'next/head';
import { Constellation } from '../../lib/constellate';
import PanelContent from '../../components/panels/panel_content';
import { useEuiTheme } from '@elastic/eui';
import { useRouter } from 'next/router';
import data from '../../../public/mcmc.constellate.json';
import Header from '../../components/starter/header';

function StarPage({ constellation }) {
  const { colorMode } = useEuiTheme();
  const router = useRouter();
  const { id } = router.query;
  const starId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
  const uuid = 'asdf';

  return (
    <>
      {constellation && (
        <>
          <Head>
            <title>{constellation.title}</title>
          </Head>

          <Header />
          <PanelContent
            star={constellation.stars[starId]}
            uuid={uuid}
            panelUrl="http://localhost:5006"
            isDark={colorMode === 'DARK'}
          />
        </>
      )}
    </>
  );
}

export default StarPage;

export async function getStaticPaths() {
  /* const res = await fetch(
   *   'file:///home/nicholas/programs/constellations/metropolis-hastings/mcmc.constellate.json'
   * );
   * const constellation: Constellation = await res.json(); */
  data.stars = data.stars.slice(0, 1);

  // @ts-ignore
  const constellation: Constellation = data;

  const paths = [];
  constellation.stars.forEach((s, i) => {
    paths.push({
      params: {
        id: i.toString(),
      },
    });
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps() {
  /* const res = await fetch(
   *   'file:///home/nicholas/programs/constellations/metropolis-hastings/mcmc.constellate.json'
   * );
   * const constellation: Constellation = await res.json();  */

  // @ts-ignore
  const constellation: Constellation = data;

  return {
    props: {
      constellation: constellation,
    },
  };
}
