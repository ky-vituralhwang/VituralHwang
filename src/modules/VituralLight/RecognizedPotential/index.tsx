import RichText from "@/components/PrismicHelper/RichText";

import style from "./style.module.scss";
import TypoBody from "@/components/Typo/Body";

const VituralightRecognizedPotential = ({ slice }: any) => {
    const { top_paragraph, description_of_list, list_member, last_description } = slice.primary || {};

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className={style.recognizedPotential}
        >
            <div className="container grid">
                <RichText 
                    content={top_paragraph}
                    className={style.recognizedPotential__top}
                />
                <TypoBody
                    size={16}
                    className={style.recognizedPotential__desc}
                >
                    {description_of_list}
                </TypoBody>
                <div className={style.recognizedPotential__list}>
                    {list_member && list_member.map((member: any, index: number) => (
                        <MemberModule key={index} data={member} />
                    ))}
                </div>
                <RichText 
                    content={last_description}
                    className={style.recognizedPotential__last}
                />
            </div>
        </section>
    )
}



const MemberModule = ({ data }: any) => {
    const { name, description } = data || {};
    return (
        <div className={style.member}>
            <TypoBody className={style.member__name} tag="span">
                {name}
            </TypoBody>
            <TypoBody className={style.member__desc}>
                {description}
            </TypoBody>
        </div>
    )
}

export default VituralightRecognizedPotential;