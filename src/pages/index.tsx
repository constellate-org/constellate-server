import Head from 'next/head';
import { EuiSpacer } from '@elastic/eui';
import HomeHero from '../components/starter/home_hero';
import Wrapper from '../components/starter/wrapper';
import HomeTemplates from '../components/starter/home_templates';
import HomeWhy from '../components/starter/home_why';
import { Constellation } from '../lib/constellate';

function Index({ constellation }) {
    return (
        <>
            <Head>
                <title>{constellation.title}</title>
            </Head>

            <Wrapper>
                <HomeHero />

                <EuiSpacer size="xxl" />
                <EuiSpacer size="xxl" />

                <HomeWhy />

                <EuiSpacer size="xxl" />
                <EuiSpacer size="xxl" />
                <EuiSpacer size="xxl" />

                <HomeTemplates />

                <EuiSpacer size="xxl" />
                <EuiSpacer size="xxl" />
            </Wrapper>
        </>
    );
};

export default Index;

export async function getStaticProps() {
    const res = await fetch('https://gist.githubusercontent.com/nicholas-miklaucic/3daf5c1f4000aeead83f6415b5e5b29f/raw/bad5f34aeb8d12a1ff0e027a2dbb9c04eebba09a/constellation.json');
    const constellation: Constellation = await res.json()

    return {
        props: {
            constellation,
        },
    }
}
