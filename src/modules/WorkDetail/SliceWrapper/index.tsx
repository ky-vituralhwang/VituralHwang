import WorkdetailListingModule from "../Listing";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { isEmpty } from "lodash";
import TypoHeading from "@/components/Typo/Heading";
import style from './style.module.scss'
import cn from "clsx";


const WorkDetailSliceWrapper = ({ data }: { data: any }) => {
    const { slices, label_of_detail_slices } = data || {};

    const gridComp = slices.filter((slice: any) => slice.slice_type === "project_slice");

    const restComp = slices.filter((slice: any) => slice.slice_type !== "project_slice");

    return (
        <>
            {!isEmpty(gridComp) && (
                <div className="container">
                    <WorkdetailListingModule data={gridComp} />
                </div>
            )}

            {!isEmpty(restComp) && (
                <div
                    className={cn(style.container, "container")}
                >
                    <TypoHeading
                        tag="div"
                        size={2}
                        className={style.label}
                    >
                        {label_of_detail_slices}
                    </TypoHeading>
                    <div className={style.slices}>
                        <SliceZone
                            slices={restComp}
                            components={components}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default WorkDetailSliceWrapper;