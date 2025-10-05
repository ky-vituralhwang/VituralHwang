

import RichText from '@/components/PrismicHelper/RichText';
import style from './style.module.scss'

const Richtext = ({ slice }: any) => {
    const { richtext } = slice?.primary || {};

    return (
        <section className={style.richtext}>
            <div className="container">
                <RichText
                    content={richtext}
                    isRichText={true}
                />
            </div>
        </section>
    )
}

export default Richtext;