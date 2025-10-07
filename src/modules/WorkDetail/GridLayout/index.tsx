
import ImagePlaceholder from '@/base/Image';
import style from './style.module.scss'

const WorkDetailSliceGridModule = ({ slice }: any) => {
    const { columns, list_image } = slice?.primary || {};

    const realColumns = columns || 2;
    return (
        <div
            className={style.detailGrid}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            style={{
                '--grid-columns': realColumns,
            } as any}
        >
            {list_image.map((item: any, idx: number) => (
                <ImagePlaceholder
                    key={idx}
                    src={item?.image?.url}
                    alt={item?.image?.alt}
                    dimensions={item?.image?.dimensions}
                />
            ))}
        </div>
    )
}


export default WorkDetailSliceGridModule;