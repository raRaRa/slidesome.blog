import React from 'react'
import classNames from 'classnames'

import style from './Button.module.scss'


const Button = ({
    children,
    className,
    // disabled,
    title,
    fill,
    floatLeft,
    primary,
    secondary,
    forHeader,
    forHero,
    effect,
    small,
    medium,
    noColor,
    lightFont,
    // isLink,
    // isNormalLink,
    // type,
    target,
    ref,
    notResponsive,
    isUnderlineLink,
    to,
    // redirect,
    // onClick,
    spanEffect,
}) => {

    const classes = classNames({
        [style.btn]: true,
        [className]: className !== undefined,
        [style.fill]: fill !== undefined && fill === true,
        [style.primary]: primary !== undefined,
        [style.secondary]: secondary !== undefined,
        [style.forHeader]: forHeader !== undefined,
        [style.forHero]: forHero !== undefined,
        [style.effect]: effect !== undefined,
        [style.small]: small !== undefined,
        [style.medium]: medium !== undefined,
        [style.noColor]: noColor !== undefined,
        [style.lightFont]: lightFont !== undefined,
        [style.notResponsive]: notResponsive !== undefined,
        [style.isUnderlineLink]: isUnderlineLink !== undefined,
        [style.floatLeft]: floatLeft !== undefined,
        [style.spanEffect]: spanEffect !== undefined,
    })

    return (
        <a
            className={classes}
            href={to}
            title={title}
            // onClick={to === undefined ? clickHandler : null}
            ref={ref}
            target={target}
        >
            {children}
        </a>
    )
}

export default React.memo(Button)
