import React from 'react'

import {EntityType} from '../../models/entities/entity'

function getLabel(type) {
  switch (type) {
    case EntityType.RECORDING:
      return 'Recording:'
    case EntityType.RELEASE:
      return 'Release:'
    case EntityType.RELEASE_GROUP:
      return 'Release group:'
    case EntityType.ARTIST:
      return 'Artist:'
    default:
      return ''
  }
}

// There was a bug with react and getting onChange to fire more than once
// for a radio button. That's why there is this jquery garbage :/
class EntityTypePicker extends React.Component {
  componentDidMount() {
    this.checkType(this.props.selectedType)
    $('input[name=entity-type]').change(() => {
      const checkedType = $('input[name=entity-type][checked=true]').val()
      this.checkType(checkedType)
      this.props.onChange()
    })
  }
  checkType(type) {
    $('input[name=entity-type][value=' + type + ']').attr('checked', true)
  }
  render() {
    return (
      <div className="entity-type-picker">
        {Object.values(EntityType).map((type, i) =>
            (<div key={type} className="radio entity-type-radio-button">
              <label>
                <input type="radio" name="entity-type" value={type}/>
                {getLabel(type)}
              </label>
            </div>))}
      </div>
    )
  }
}


export default EntityTypePicker
