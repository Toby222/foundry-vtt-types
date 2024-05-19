import type { ConfiguredDocumentClassForName } from "../../../../types/helperTypes.d.mts";
import type { DeepPartial } from "../../../../types/utils.d.mts";

declare global {
  /**
   * The client-side Card document which extends the common BaseCard document model.
   *
   * @see {@link documents.Cards}                    The Cards document type which contains Card embedded documents
   */
  // TODO: TypeName handling.
  class Card extends ClientDocumentMixin(foundry.documents.BaseCard) {
    /**
     * The current card face
     */
    get currentFace(): CardFaceData | null;

    /**
     * The image of the currently displayed card face or back
     */
    get img(): string;

    /**
     * The name of the current card face, or the name of the card itself
     */
    get name(): string;

    /**
     * A reference to the source Cards document which defines this Card.
     */
    get source(): InstanceType<ConfiguredDocumentClassForName<"Cards">> | undefined | null;

    /**
     * A convenience property for whether or not the Card is within its source Cards stack. Cards in decks are always
     * considered home.
     */
    get isHome(): boolean;

    /**
     * Whether or not to display the face of this card?
     */
    get showFace(): boolean;

    /**
     * Does this Card have a next face available to flip to?
     */
    get hasNextFace(): boolean;

    /**
     * Does this Card have a previous face available to flip to?
     */
    get hasPreviousFace(): boolean;

    override prepareDerivedData(): void;

    /**
     * Flip this card to some other face. A specific face may be requested, otherwise:
     * If the card currently displays a face the card is flipped to the back.
     * If the card currently displays the back it is flipped to the first face.
     * @param face - A specific face to flip the card to
     * @returns A reference to this card after the flip operation is complete
     */
    flip(face?: number | null | undefined): Promise<InstanceType<ConfiguredDocumentClassForName<"Card">> | undefined>;

    /**
     * Pass this Card to some other Cards document.
     * @param to      - A new Cards document this card should be passed to
     * @param options - (default: `{}`)
     * @returns A reference to this card after the it has been passed to another parent document
     */
    pass(
      to: InstanceType<ConfiguredDocumentClassForName<"Cards">>,
      options?: Cards.PassOptions | undefined,
    ): Promise<InstanceType<ConfiguredDocumentClassForName<"Card">> | undefined>;

    /**
     * Play a specific card to some other Cards document.
     * This method is currently a more semantic alias for Card#pass.
     * @see Card#pass
     */
    play(
      to: InstanceType<ConfiguredDocumentClassForName<"Cards">>,
      options?: Cards.PassOptions | undefined,
    ): Promise<InstanceType<ConfiguredDocumentClassForName<"Card">> | undefined>;

    /**
     * Discard a specific card to some other Cards document.
     * This method is currently a more semantic alias for Card#pass.
     * @see Card#pass
     */
    discard(
      to: InstanceType<ConfiguredDocumentClassForName<"Cards">>,
      options?: Cards.PassOptions | undefined,
    ): Promise<InstanceType<ConfiguredDocumentClassForName<"Card">> | undefined>;

    /**
     * Recall this Card to its original Cards parent.
     * @param options - Options which modify the reset operation
     *                  (default: `{}`)
     * @returns A reference to the reset card belonging to its original parent
     */
    recall(options?: Cards.ResetOptions | undefined): Promise<InstanceType<ConfiguredDocumentClassForName<"Card">>>;

    /**
     * Create a chat message which displays this Card.
     * @param messageData - Additional data which becomes part of the created ChatMessageData
     *                      (default: `{}`)
     * @param options     - Options which modify the message creation operation
     *                      (default: `{}`)
     * @returns The created chat message
     */
    toMessage(
      messageData?: DeepPartial<foundry.documents.BaseChatMessage.ConstructorData>,
      options?: DocumentModificationContext | undefined,
    ): Promise<InstanceType<ConfiguredDocumentClassForName<"ChatMessage">> | undefined>;
  }
}
