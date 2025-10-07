import style from './style.module.scss'

const WorkDetailSliceWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className={style.sliceWrapper}>
            {children}
        </section>
    )
}

export default WorkDetailSliceWrapper;