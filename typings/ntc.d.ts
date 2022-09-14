import { Color } from "chroma-js";

export type RgbArray = [r: number, g: number, b: number];
export type RgbResolvable = {
    r: number,
    g: number,
    b: number
}
export type HslResolvable = {
    h: number,
    s: number,
    l: number
}
export type LhcResolvable = {
    l: number,
    h: number,
    c: number
}
export type CmykResolvable = {
    c: number,
    m: number,
    y: number,
    k: number
}

export type ColorResolvable = string | number | RgbArray | RgbResolvable | HslResolvable | LhcResolvable | CmykResolvable | Color;

export type NtcDictionary = {
    color: NtcDictionaryEntry[],
    shade: NtcDictionaryEntry[]
}

export type NtcDictionaryEntry = [hexCode: string, name: string];

export type NtcResult = {
    hex: string,
    name: string,
    exact: boolean
}

export type NtcColor = {
    color: NtcResult,
    shade: NtcResult
}

export type DictionaryPath = {
    shade: string,
    color: string
}

export type Ntc = {
    current_locale: string;
    fallback_locale: string;
    dictionaries: NtcDictionary;
    dictionaries_path: DictionaryPath;

    build_dictionaries(locale?: string): void;
    name(color: ColorResolvable, locale?: string): NtcColor;
}

declare const ntc: Ntc;
export default ntc;
