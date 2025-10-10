
import RichText from '@/components/PrismicHelper/RichText';
import style from './style.module.scss';
import TypoHeading from '@/components/Typo/Heading';

const Vituralight2Cols = ({ slice }: any) => {
    const { title, description } = slice?.primary || {};
    return (
        <section
            className={style.twoCols}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container grid">
                <RichText
                    content={title}
                    className={style.twoCols__title}
                    overwrite={{
                        paragraph: ({ children }: { children: React.ReactNode }) => (
                            <TypoHeading size={28} tag="div" className={style.paragraph}>
                                {children}<br />
                            </TypoHeading>
                        ),
                    }}
                />
                <RichText
                    content={description}
                    isRichText={true}
                    className={style.twoCols__desc}
                />
            </div>
        </section>
    )
}

export default Vituralight2Cols;
