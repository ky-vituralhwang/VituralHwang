import style from './style.module.scss'
import RichText from '@/components/PrismicHelper/RichText';
import TypoBody from '@/components/Typo/Body';


const Richtext = ({ slice }:any) => {
    const { richtext } = slice?.primary || {};

    return (
        <section
            className={style.richtext}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="container">
                <RichText
                    content={richtext}
                    isRichText={false}
                    overwrite={{
                        paragraph: ({ children }: { children: React.ReactNode }) => (
                            <TypoBody size={26} tag="p" className={style.richtext__paragraph}>
                                {children}<br />
                            </TypoBody>
                        ),
                    }}
                />
            </div>
        </section>
    )
}

export default Richtext