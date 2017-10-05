import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SearchResultsContainer from './components/search_results/search_results_container'

/// App routes.
///
/// '/:entityType' - Shows a list of search results for type [:entityType].
///     UrlParams:
///       [q] (optional, but will show no results when empty): The search query
///       [pg] (optional, defaults to 1): The page #
///
/// '/' - Shows just the search bar and an empty list of results.
const Routes = () => (
  <Switch>
    <Route path="/:entityType" component={SearchResultsContainer} />
    <Route path="/" component={SearchResultsContainer} />
  </Switch>
)

export default Routes
