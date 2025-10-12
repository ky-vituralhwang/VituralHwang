
import TypoHeading from '@/components/Typo/Heading';
import style from './style.module.scss';
import cn from 'clsx';
import TypoBody from '@/components/Typo/Body';
import { isEmpty } from 'lodash';

const AboutSkillModule = ({ slice }: any) => {
    const { title, title_right } = slice?.primary || {};
    const { variation } = slice || {};
    return (
        <div
            className={cn(style.skill, "grid")}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <TypoHeading
                size={24}
                tag="div"
                className={style.skill__text}
            >
                {title}
            </TypoHeading>
            <div className={style.skill__content}>
                {(() => {
                    switch (variation) {
                        case 'default':
                            return <DefaultSkillList
                                data={slice}
                            />;
                        case '2Columns':
                            return <TwoColumnSkillList
                                data={slice}
                            />;
                    }
                })()}
            </div>
        </div>
    )
}

const DefaultSkillList = ({ data }: any) => {
    const { skill_list, title_right } = data?.primary || {};
    return (
        <>
            <TypoBody
                size={16}
                className={style.skill__label}
            >
                {title_right}
            </TypoBody>
            <div className={style.skill__single}>
                {skill_list?.map((item: any, index: number) => (
                    <TypoBody
                        key={index}
                        size={16}
                        className={style.skill__item}
                    >
                        {item?.skill}
                    </TypoBody>
                ))}
            </div>
        </>
    )
}

const TwoColumnSkillList = ({ data }: any) => {
    const { skill_list_left, skill_list_right, title_right } = data?.primary || {};

    return (
        <>
            <TypoBody
                size={16}
                className={style.skill__label}
            >
                {title_right}
            </TypoBody>
            <div className={style.skill__2columns}>
                {!isEmpty(skill_list_left) && (
                    <div className={style.skill__single}>
                        {skill_list_left?.map((item: any, index: number) => (
                            <TypoBody
                                key={index}
                                size={16}
                                className={style.skill__item}
                            >
                                {item?.skill}
                            </TypoBody>
                        ))}
                    </div>
                )}
                {!isEmpty(skill_list_right) && (
                    <div className={style.skill__single}>
                        {skill_list_right?.map((item: any, index: number) => (
                            <TypoBody
                                key={index}
                                size={16}
                                className={style.skill__item}
                            >
                                {item?.skill}
                            </TypoBody>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default AboutSkillModule;