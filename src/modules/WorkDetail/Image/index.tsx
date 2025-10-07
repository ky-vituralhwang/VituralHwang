
import ImagePlaceholder from '@/base/Image';
import style from './style.module.scss'

const WorkDetailSliceImageModule = ({ slice }: any) => {
    const { image } = slice?.primary || {};
    return (
        <div
            className={style.detailImage}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <ImagePlaceholder
                src={image?.url}
                alt={image?.alt}
                dimensions={image?.dimensions}
            />
        </div>
    )
}


export default WorkDetailSliceImageModule;