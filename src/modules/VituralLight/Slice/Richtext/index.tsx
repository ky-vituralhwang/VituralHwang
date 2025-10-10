
import RichText from '@/components/PrismicHelper/RichText';
import style from './style.module.scss';

const VituralightRichtext = ({ slice }: any) => {
    const { richtext } = slice.primary || {};

    return (
        <section
            className={style.richtext}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container grid">
                <RichText
                    content={richtext}
                    isRichText={true}
                    className={style.richtext__inner}
                />
            </div>
        </section>
    )
}

export default VituralightRichtext;