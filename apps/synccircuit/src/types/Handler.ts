export type Handler = {
  createEventHandler(): void;
  createCommandHandler(): void;
  createButtonHandler(): void;
  createContextMenuCommandHandler(): void;
};
