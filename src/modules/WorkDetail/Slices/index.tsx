
import TypoHeading from '@/components/Typo/Heading';
import style from './style.module.scss'
import cn from "clsx";
import RichText from '@/components/PrismicHelper/RichText';
import TypoBody from '@/components/Typo/Body';
import { isEmpty } from 'lodash';
import ImagePlaceholder from '@/base/Image';

const WorkDetailSliceDetailModule = ({ slice }: any) => {
    const { list_content, list_image } = slice?.primary || {};
    return (
        <section
            className={style.detailSlice}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className={style.detailSlice__list}>
                {!isEmpty(list_content) && (
                    list_content.map((item: any, idx: number) => (
                        <ListContent
                            key={idx}
                            data={item}
                        />
                    ))
                )}
                {!isEmpty(list_image) && (
                    list_image.map((item: any, idx: number) => {
                        return !isEmpty(item?.image?.url) && (
                            <ListImage
                                key={idx}
                                data={item}
                            />
                        )
                    })
                )}
            </div>
        </section>
    )
}

const ListContent = (data: any) => {
    const { title, description } = data.data || {};
    return (
        <div
            className={
                cn(style.detailContent__item, 'grid')
            }
        >
            <TypoHeading
                size={2}
                className={style.detailContent__title}
            >
                {title}
            </TypoHeading>
            <RichText
                content={description}
                className={style.detailContent__description}
                overwrite={{
                    paragraph: ({ children }: { children: React.ReactNode }) => (
                        <TypoBody
                            size={26}
                            tag="p"
                            className={style.paragraph}
                        >
                            {children}<br />
                        </TypoBody>
                    ),
                }}
            />
        </div>
    )
}


const ListImage = ({data}: any) => {
    const { image } = data || {};
    return (
        <div className={style.detailImage__item}>
            <ImagePlaceholder
                src={image?.url}
                alt={image?.alt}
                dimensions={image?.dimensions}
            />
        </div>
    )
}


export default WorkDetailSliceDetailModule;
