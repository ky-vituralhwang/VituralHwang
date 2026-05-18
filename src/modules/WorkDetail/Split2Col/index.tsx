
import style from './style.module.scss'
import cn from 'clsx';
import ImagePlaceholder from '@/base/Image';
import TypoBody from '@/components/Typo/Body';
import RichText from '@/components/PrismicHelper/RichText';

const WorkDetailSliceSplit2ColModule = ({ slice }: any) => {

    const { image, title, description, image_in_left_side } = slice?.primary || {};
    
    return (
        <div
            className={cn(
                style.split2Col,
                image_in_left_side && style.imgInLeftSide
            )
        }
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container grid">
                <div className={style.split2Col__image}>
                    <ImagePlaceholder
                        src={image?.url}
                        alt={image?.alt}
                        dimensions={image?.dimensions}
                    />
                </div>

                <div className={style.split2Col__content}>
                    <TypoBody
                        size={26}
                        tag="div"
                        className={style.split2Col__title}
                    >
                        {title}
                    </TypoBody>
                    <RichText
                        content={description}
                        className={style.split2Col__description}
                        overwrite={{
                            paragraph: ({ children }: { children: React.ReactNode }) => (
                                <TypoBody
                                    tag="p"
                                >
                                    {children}<br />
                                </TypoBody>
                            ),
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default WorkDetailSliceSplit2ColModule;