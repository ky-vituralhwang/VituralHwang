
import TypoHeading from '@/components/Typo/Heading';
import style from './style.module.scss';
import cn from "clsx";
import RichText from '@/components/PrismicHelper/RichText';
import TypoBody from '@/components/Typo/Body';
import { isEmpty } from 'lodash';

const WorkDetailSlideDetailModule = ({ slice }: any) => {
    const { list_content, big_title } = slice?.primary || {};

    return (
        <div className={style.detailDetail} >
            {!isEmpty(big_title) && (
                <div className="container">
                    <TypoHeading
                        className={style.detailDetail__bigTitle}
                    >
                        {big_title}
                    </TypoHeading>
                </div>
            )}
            <div className={style.detailDetail__list}>
                {!isEmpty(list_content) && (
                    list_content.map((item: any, idx: number) => (
                        <ListContent
                            key={idx}
                            data={item}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

const ListContent = (data: any) => {
    const { title, description } = data.data || {};
    return (
        <div
            className={
                cn(style.detailDetail__item, "container", "grid")
            }
        >
            <TypoBody
                size={16}
                tag="div"
                className={style.detailDetail__title}
            >
                {title}
            </TypoBody>
            <RichText
                content={description}
                className={style.detailDetail__description}
                overwrite={{
                    paragraph: ({ children }: { children: React.ReactNode }) => (
                        <TypoBody
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


export default WorkDetailSlideDetailModule;