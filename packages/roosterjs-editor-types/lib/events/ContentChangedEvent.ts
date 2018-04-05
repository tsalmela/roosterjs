import PluginEvent from './PluginEvent';

/**
 * Possible change sources. Here are the predefined sources.
 * It can also be other string if the change source can't fall into these sources.
 */
export const enum ChangeSource {
    /**
     * Content changed by auto bullet
     */
    AutoBullet = 'AutoBullet',

    /**
     * Content changed by auto link
     */
    AutoLink = 'AutoLink',

    /**
     * Content changed by create link
     */
    CreateLink = 'CreateLink',

    /**
     * Content changed by format
     */
    Format = 'Format',

    /**
     * Content changed by image resize
     */
    ImageResize = 'ImageResize',

    /**
     * Content changed by paste
     */
    Paste = 'Paste',

    /**
     * Content changed by setContent API
     */
    SetContent = 'SetContent',

    /**
     * Content changed by cut operation
     */
    Cut = 'Cut',

    /**
     * Content changed by drag & drop operation
     */
    Drop = 'Drop',
}

/**
 * Represents a custom PluginEvent for content change
 */
interface ContentChangedEvent extends PluginEvent {
    /**
     * Source of the change
     */
    source: ChangeSource | string;

    /**
     * Optional related data
     */
    data?: any;
}

export default ContentChangedEvent;
