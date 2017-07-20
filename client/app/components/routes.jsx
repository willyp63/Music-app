import React from 'react'
import { Switch, Route } from 'react-router-dom'

import EntityIndexContainer from './entity/index/entity_index_container'
import EntityShowContainer from './entity/show/entity_show_container'

const Routes = () => (
  <Switch>
    <Route path="/:entityType/:mbid" component={EntityShowContainer} />
    <Route path="/:entityType" component={EntityIndexContainer} />
    <Route path="/" component={EntityIndexContainer} />
  </Switch>
)

export default Routes