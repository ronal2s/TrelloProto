import React from "react";
import { Skeleton } from "@material-ui/lab";

function CardSkeleton() {
    return (
        <>
            <Skeleton variant="rect" width={200} /> <br />
            <Skeleton variant="rect" width={250} height={170} />
        </>
    )
}

export default CardSkeleton;