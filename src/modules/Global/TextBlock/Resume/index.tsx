
import RichText from '@/components/PrismicHelper/RichText';
import style from './style.module.scss';
import cn from 'clsx';
import { isEmpty } from 'lodash';
import TypoHeading from '@/components/Typo/Heading';
import TypoBody from '@/components/Typo/Body';


const Label = ({text} : {text: string}) => {
    return (
        <div className={style.label}>
            <hr className={style.label__hr}/>
            <TypoHeading
                tag="h4"
                size={24}
                className={style.label__text}
            >
                {text}
            </TypoHeading>
        </div>
    )
}

const Resume = ({ slice }: any) => {
    const { preamble, list_skill, label_skill, list_contact, label_contact } = slice?.primary || {};

    return (
        <section
            className={style.resume}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >

            <div className="container">
                <RichText
                    content={preamble}
                    isRichText={true}
                />
                {!isEmpty(list_skill) && (
                    <div className={style.resume__list}>
                        <Label text={label_skill} />
                        <div className={style.resume__skill}>
                            {list_skill.map((skill: any, index: number) => (
                                <div
                                    key={index}
                                    className={style.resume__skill__item}
                                >
                                    <TypoBody
                                        tag="div"
                                        className={style.resume__skill__item__title}
                                    >
                                        {skill?.title}
                                    </TypoBody>
                                    <div>
                                        <TypoBody
                                            tag="p"
                                        >
                                            {skill?.description[0]?.text}
                                        </TypoBody>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {!isEmpty(list_contact) && (
                    <div className={style.resume__list}>
                        <Label text={label_contact} />
                        <div className={style.resume__contact}>
                            {list_contact.map((contact: any, index: number) => (
                                <div
                                    key={index}
                                    className={style.resume__contact__item}
                                >
                                    <TypoBody
                                        tag="div"
                                        className={style.resume__contact__item__title}
                                    >
                                        {contact?.label}
                                    </TypoBody>
                                    <div>
                                        <RichText
                                            content={contact?.content}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Resume;