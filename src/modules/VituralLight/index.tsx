

import TypoDisplay from '@/components/Typo/Display';
import style from './style.module.scss';


const VituralLightModule = ({ data }: any) => {
    const { label_big_text } = data || {}; 

    return (
        <section className={style.vituralLight}>
            <div className="container">
                <TypoDisplay
                    tag="span"
                    className={style.vituralLight__label__text}
                >
                    {label_big_text}
                </TypoDisplay>
            </div>
        </section>
    )
}


export default VituralLightModule;