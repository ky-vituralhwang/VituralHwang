
import TypoHeading from '@/components/Typo/Heading';
import style from './style.module.scss';
import cn from 'clsx';
import RichText from '@/components/PrismicHelper/RichText';

const AboutRichtextModule = ({ slice }: any) => {
    const { title, description } = slice?.primary || {};

    return (
        <div
            className={cn(style.richtext, "grid")}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <TypoHeading
                size={24}
                tag="div"
                className={style.richtext__text}
            >
                {title}
            </TypoHeading>
            <RichText
                content={description}
                className={style.richtext__desc}
            />
        </div>
    )
}

export default AboutRichtextModule;