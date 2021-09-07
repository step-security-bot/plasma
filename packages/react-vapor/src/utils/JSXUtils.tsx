import classNames from 'classnames';
import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as _ from 'underscore';
import {clean, stripTags} from 'underscore.string';

import {decodeHtml} from './InputUtils';

export type JSXRenderable = JSX.Element | JSX.Element[] | string | number;

export const getReactNodeTextContent = (node: React.ReactNode): string =>
    _.compose(clean, decodeHtml, stripTags)(renderToStaticMarkup(<div>{node}</div>));

export const addClassNameToChildren = (children: React.ReactNode, className: string) =>
    React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
            React.cloneElement(child, {className: classNames(child.props.className, className)})
        ) : (
            <span className={className}>{child}</span>
        )
    );
