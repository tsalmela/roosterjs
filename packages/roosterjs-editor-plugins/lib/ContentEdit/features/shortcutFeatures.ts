import { Browser } from 'roosterjs-editor-dom';
import { ContentEditFeature, Keys } from '../ContentEditFeatures';
import { IEditor, cacheGetEventData } from 'roosterjs-editor-core';
import { FontSizeChange, PluginKeyboardEvent, PluginEventType } from 'roosterjs-editor-types';
import {
    changeFontSize,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleBullet,
    toggleNumbering,
} from 'roosterjs-editor-api';

interface ShortcutCommand {
    winKey: number;
    macKey: number;
    action: (editor: IEditor) => any;
}

function createCommand(winKey: number, macKey: number, action: (editor: IEditor) => any) {
    return {
        winKey: winKey,
        macKey: macKey,
        action: action,
    };
}

const commands: ShortcutCommand[] = [
    createCommand(Keys.Ctrl | Keys.B, Keys.Meta | Keys.B, toggleBold),
    createCommand(Keys.Ctrl | Keys.I, Keys.Meta | Keys.I, toggleItalic),
    createCommand(Keys.Ctrl | Keys.U, Keys.Meta | Keys.U, toggleUnderline),
    createCommand(Keys.Ctrl | Keys.Z, Keys.Meta | Keys.Z, editor => editor.undo()),
    createCommand(Keys.Ctrl | Keys.Y, Keys.Meta | Keys.Shift | Keys.Z, editor => editor.redo()),
    createCommand(Keys.Ctrl | Keys.PERIOD, Keys.Meta | Keys.PERIOD, toggleBullet),
    createCommand(Keys.Ctrl | Keys.FORWARDSLASH, Keys.Meta | Keys.FORWARDSLASH, toggleNumbering),
    createCommand(
        Keys.Ctrl | Keys.Shift | Keys.PERIOD,
        Keys.Meta | Keys.Shift | Keys.PERIOD,
        editor => changeFontSize(editor, FontSizeChange.Increase)
    ),
    createCommand(
        Keys.Ctrl | Keys.Shift | Keys.COMMA,
        Keys.Meta | Keys.Shift | Keys.COMMA,
        editor => changeFontSize(editor, FontSizeChange.Decrease)
    ),
];

export const DefaultShortcut: ContentEditFeature = {
    allowFunctionKeys: true,
    keys: [Keys.B, Keys.I, Keys.U, Keys.Y, Keys.Z, Keys.COMMA, Keys.PERIOD, Keys.FORWARDSLASH],
    shouldHandleEvent: cacheGetCommand,
    handleEvent: (event, editor) => {
        let command = cacheGetCommand(event);
        if (command) {
            command.action(editor);
            event.rawEvent.preventDefault();
            event.rawEvent.stopPropagation();
        }
    },
    isAvailable: featureSet => featureSet.defaultShortcut,
};

function cacheGetCommand(event: PluginKeyboardEvent) {
    return cacheGetEventData(event, 'DEFAULT_SHORT_COMMAND', () => {
        let e = event.rawEvent;
        let key =
            event.eventType == PluginEventType.KeyDown
                ? e.which |
                  (e.metaKey && Keys.Meta) |
                  (e.shiftKey && Keys.Shift) |
                  (e.ctrlKey && Keys.Ctrl)
                : 0;
        return key && commands.filter(cmd => (Browser.isMac ? cmd.macKey : cmd.winKey) == key)[0];
    });
}
