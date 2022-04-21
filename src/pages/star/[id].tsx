import Head from 'next/head';
import { Constellation } from '../../lib/constellate';
import PanelContent from '../../components/panels/panel_content';
import { useEuiTheme } from '@elastic/eui';
import { useRouter } from 'next/router';
import Wrapper from '../../components/starter/wrapper';
import data from '../../../public/mcmc.constellate.json';

function StarPage({ constellation }) {
  const { euiTheme, colorMode } = useEuiTheme();
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

          <Wrapper>
            <PanelContent
              star={constellation.stars[starId]}
              uuid={uuid}
              panelUrl="http://localhost:5006"
              isDark={colorMode === 'DARK'}
            />
          </Wrapper>
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
  const constellation = data;

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
  const constellation = data;

  return {
    props: {
      constellation: constellation,
    },
  };
}
