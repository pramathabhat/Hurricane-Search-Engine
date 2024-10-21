import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch,
} from "@elastic/react-search-ui";
import {
  Layout,
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticsearchAPIConnector({
  apiKey: "d3huVFk0NEJHc0dYeWM1eGZiV046aVpaNTVfQXFRZDJFbW9UN1loM1BoQQ==",
  cloud: {
    id: "webcrawler:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRhNWRhNGY1MTQ3Yjk0YmYwODAyMWJhMTQ0NDM5ZDU1NiQ3NWNiNjM4ZjM1ODA0ZmRjOWU1NTA0N2FhM2U3YWJiZA==",
  },
  index: "recent_hurricanes",
});

const config = {
  debug: true,
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    disjunctiveFacets: ["author"],
    facets : {
      author : {type : 'value'},
      
    },
    result_fields: {
      title: {
        snippet: {
          size: 100,
          fallback: true,
        },
      },
      id: { raw: {} },
      text: {
        snippet: {
        size: 100,
        fallback: true,
      },
    },
      author: {},
    },
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      result_fields: {
        id: {
        },
        title: {
          snippet: {
            size: 100,
            fallback: true,
          },
        },
        text: {
          snippet: {
            size: 100,
            fallback: true,
          },
        },
      },
    },
    suggestions: {
      types: {
        documents: {
          fields: ["id", "title", "text", ],
        },
      },
      size: 4,
    },
  },
};

export default function App() {
  return (
    <div>
      
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched,
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      // Set debounceLength and searchAsYouType props
                      debounceLength={300}
                      searchAsYouType={true}
                    />
                  }
                  sideContent={
                    <div>
                      <Facet
                        field="author"
                        label="Author"
                        filterType="any"
                      />
                    </div>
                    
                  }
                  bodyContent={
                    <Results
                      titleField="id"
                      urlField="id"
                      thumbnailField="image_url"
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
    </div>
  );
}
