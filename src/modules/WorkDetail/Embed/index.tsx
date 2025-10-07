

import style from './style.module.scss'

const WorkDetailSliceEmbedModule = ({ slice }: any) => {
    const { embed } = slice?.primary || {};
    const aspectRatio = embed?.width / embed?.height;
    return (
        <div
            className={style.detailEmbed}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div
                style={{ aspectRatio }}
                dangerouslySetInnerHTML={{ __html: embed.html }}
                className={style.detailEmbed__item}
            />
        </div>
    )
}


export default WorkDetailSliceEmbedModule;