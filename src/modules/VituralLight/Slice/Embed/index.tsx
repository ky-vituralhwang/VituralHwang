

import style from './style.module.scss'

const VituralightEmbed = ({ slice }: any) => {
    const { embed } = slice.primary || {};
    const aspectRatio = embed?.width / embed?.height;
    return (
        <section
            className={style.embed}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div
                style={{ aspectRatio }}
                className={style.embed__item}
                dangerouslySetInnerHTML={{ __html: embed.html }}
            />
        </section>
    )
}

export default VituralightEmbed;