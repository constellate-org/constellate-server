import Head from 'next/head';
import Link from 'next/link';
import TextPanel from '../../components/markdown/text_panel';
import { Constellation, hasImgPanel } from '../../lib/constellate';
import PanelContent from '../../components/panels/panel_content';
import {
  EuiButton,
  EuiButtonIcon,
  EuiCollapsibleNav,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiListGroup,
  EuiListGroupItem,
  EuiPageTemplate,
  EuiPanel,
  EuiResizableContainer,
  useEuiTheme,
} from '@elastic/eui';
import { useRouter } from 'next/router';
import data from '../../../public/mcmc.constellate.json';
import SideBar from '../../components/side_nav';
import ThemeSwitcher from '../../components/rho/theme_switcher';
import { useState } from 'react';

function StarPage({ constellation }) {
  const router = useRouter();
  const { colorMode } = useEuiTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const { id } = router.query;
  const starId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
  const uuid = 'asdf';
  const shouldRenderImg = hasImgPanel(constellation.stars[starId]);
  const numIds = constellation.stars.length;

  const prevId = starId - 1 >= 0 ? starId - 1 : null;
  const nextId = starId + 1 < numIds ? starId + 1 : null;

  const imgTabContentFunc = EuiResizablePanel => {
    if (shouldRenderImg) {
      return (
        <EuiResizablePanel
          initialSize={50}
          paddingSize="none"
          color="plain"
          className="genericPanel">
          <PanelContent
            star={constellation.stars[starId]}
            uuid={uuid}
            panelUrl="http://localhost:5006"
            isDark={colorMode === 'DARK'}
          />
        </EuiResizablePanel>
      );
    } else {
      return <></>;
    }
  };

  const collapsibleNav = (
    <EuiCollapsibleNav
      size={300}
      onClose={() => {
        setIsNavOpen(false);
      }}
      isOpen={isNavOpen}
      isDocked={isNavOpen}
      closeButtonPosition="inside"
      button={
        <EuiButtonIcon
          aria-labelledby="menu"
          iconType="menu"
          color="text"
          display={isNavOpen ? 'fill' : 'empty'}
          onClick={() => setIsNavOpen(!isNavOpen)}>
          Open
        </EuiButtonIcon>
      }
      showButtonIfDocked
      ownFocus={false}
      className="collapseNavAnimate">
      {isNavOpen && (
        <EuiPanel>
          <EuiFlexGroup
            direction="column"
            justifyContent="spaceBetween"
            className="eui-fullHeight">
            <EuiFlexItem>
              <SideBar constellation={constellation} currId={starId}></SideBar>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiListGroup gutterSize="none">
                <EuiListGroupItem
                  size="xs"
                  wrapText
                  label={'© Nicholas Miklaucic 2022'}
                />
                <EuiListGroupItem
                  size="xs"
                  wrapText
                  href="https://github.com/nicholas-miklaucic/constellate"
                  label="Made Using Constellation"
                />
                <EuiListGroupItem
                  size="xs"
                  wrapText
                  href="#"
                  label="Static version"
                />
              </EuiListGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      )}
    </EuiCollapsibleNav>
  );

  return (
    <>
      {constellation && (
        <>
          <Head>
            <title>{constellation.title}</title>
          </Head>

          <EuiPageTemplate
            paddingSize="none"
            template="empty"
            fullHeight={true}
            restrictWidth={false}
            className="page-grow">
            <EuiHeader position="fixed">
              <EuiHeaderSection side="left">
                <EuiHeaderSectionItem>{collapsibleNav}</EuiHeaderSectionItem>
                <EuiHeaderSectionItem>
                  <EuiHeaderLogo iconType="/pollardsrho.svg">
                    {"Pollard's Rho"}
                  </EuiHeaderLogo>
                </EuiHeaderSectionItem>
              </EuiHeaderSection>
              <EuiHeaderSection side="left">
                <EuiHeaderSectionItem>
                  <h1 id="essay-title">{constellation.title}</h1>
                </EuiHeaderSectionItem>
              </EuiHeaderSection>
              <EuiHeaderSection side="right">
                <EuiHeaderSectionItem>
                  <ThemeSwitcher key="theme-switcher" />
                </EuiHeaderSectionItem>
              </EuiHeaderSection>
            </EuiHeader>
            <EuiResizableContainer className="eui-fullHeight">
              {(EuiResizablePanel, EuiResizableButton) => (
                <>
                  <EuiResizablePanel
                    initialSize={shouldRenderImg ? 50 : 100}
                    scrollable={false}
                    grow={true}
                    paddingSize="none"
                    color="plain"
                    hasShadow
                    hasBorder>
                    <TextPanel content={constellation.stars[starId].markdown} />
                    {prevId && (
                      <Link href={`/star/${prevId}`} passHref>
                        <EuiButton
                          id="prevBtn"
                          rel="prev me"
                          color="text"
                          href={`/star/${prevId}`}>
                          Last Page
                        </EuiButton>
                      </Link>
                    )}
                    {nextId && (
                      <Link href={`/star/${nextId}`} passHref>
                        <EuiButton
                          color="primary"
                          rel="next me"
                          fill={true}
                          href={`/star/${nextId}`}
                          id="nextBtn">
                          Next Page
                        </EuiButton>
                      </Link>
                    )}
                  </EuiResizablePanel>

                  <EuiResizableButton />
                  {imgTabContentFunc(EuiResizablePanel)}
                </>
              )}
            </EuiResizableContainer>
          </EuiPageTemplate>
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
    paths: paths.slice(0, 2),
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
