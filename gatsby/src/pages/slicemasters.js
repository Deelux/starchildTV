import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/pagination';

const SlicemasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const StyledSlicemasters = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-style: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background-color: var(--yellow);
    text-align: center;
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
  }
`;

export default function SlicemastersPage({ data, pageContext }) {
  const persons = data.persons.nodes;
  return (
    <>
      <p>I'm the slicemaster page! There are {persons.length} inputs.</p>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.persons.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGrid>
        {persons.map((person) => (
          <StyledSlicemasters key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </StyledSlicemasters>
        ))}
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query PersonQuery($skip: Int = 0, $pageSize: Int = 2) {
    persons: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
