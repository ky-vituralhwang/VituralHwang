

import TypoDisplay from '@/components/Typo/Display';
import style from './style.module.scss';
import ImagePlaceholder from '@/base/Image';


const VituralLightModule = ({ data }: any) => {
    const { label_big_text, image_under_title } = data || {}; 
    return (
        <section className={style.vituralLight}>
            <div className="container grid">
                <TypoDisplay
                    tag="h1"
                    size={90}
                    className={style.vituralLight__title}
                >
                    {label_big_text}
                </TypoDisplay>
                <div className={style.vituralLight__image}>
                    <ImagePlaceholder
                        src={image_under_title?.url}
                        alt={image_under_title?.alt}
                        dimensions={image_under_title?.dimensions}
                        optimized={false}
                    />
                </div>
            </div>
        </section>
    )
}


export default VituralLightModule;