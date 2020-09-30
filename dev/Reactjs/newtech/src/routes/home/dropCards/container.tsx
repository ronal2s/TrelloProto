import React, { useState } from 'react'
import { Dustbin } from './dustbin'
import { ItemTypes } from '../../../utils/enums';

const Container = () => (
    <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
            <Dustbin allowedDropEffect="any" name={ItemTypes.TODO} />
            <Dustbin allowedDropEffect="any" name={ItemTypes.PENDING} />
            <Dustbin allowedDropEffect="any" name={ItemTypes.DONE} />
        </div>
    </div>
)

export default Container;