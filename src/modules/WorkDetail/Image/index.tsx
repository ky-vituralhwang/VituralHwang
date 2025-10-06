
import ImagePlaceholder from '@/base/Image';
import style from './style.module.scss'
import cn from "clsx";


const WorkDetailSliceImageModule = ({ slice }: any) => {
    const { image } = slice?.primary || {};
    return (
        <section
            className={style.detailImage}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <ImagePlaceholder
                src={image?.url}
                alt={image?.alt}
                dimensions={image?.dimensions}
            />
        </section>
    )
}


export default WorkDetailSliceImageModule;