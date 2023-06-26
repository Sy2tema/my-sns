import PropTypes from 'prop-types';

declare module 'prop-types' {
    export const any: Requireable<any>;
    export const arrayOf: Requireable<any>;
}