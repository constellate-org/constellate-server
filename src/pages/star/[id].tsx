import Head from 'next/head';
import { Constellation } from '../../lib/constellate';
import PanelContent from '../../components/panels/panel_content';
import { useEuiTheme } from '@elastic/eui';
import { useRouter } from 'next/router';
import Wrapper from '../../components/starter/wrapper';

function Page({ constellation }) {
    const { euiTheme, colorMode } = useEuiTheme()
    const router = useRouter()
    const { id } = router.query
    const starId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const uuid = 'asdf'

    return (
        <>
            <Head>
                <title>{constellation.title}</title>
            </Head>

            <Wrapper>
                <PanelContent star={constellation.stars[starId]} uuid={uuid} panelUrl="http://localhost:5006" isDark={colorMode === "DARK"} />
            </Wrapper>
        </>
    );
};

export default Page;

export async function getStaticPaths() {
    const res = await fetch('https://gist.githubusercontent.com/nicholas-miklaucic/3daf5c1f4000aeead83f6415b5e5b29f/raw/bad5f34aeb8d12a1ff0e027a2dbb9c04eebba09a/constellation.json');
    const constellation: Constellation = await res.json()

    let paths = [];
    constellation.stars.forEach((s, i) => {
        paths.push({
            params: {
                id: i.toString()
            }
        });
    })

    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps() {
    const res = await fetch('https://gist.githubusercontent.com/nicholas-miklaucic/3daf5c1f4000aeead83f6415b5e5b29f/raw/bad5f34aeb8d12a1ff0e027a2dbb9c04eebba09a/constellation.json');
    const constellation: Constellation = await res.json()

    return {
        props: {
            constellation,
        },
    }
}
