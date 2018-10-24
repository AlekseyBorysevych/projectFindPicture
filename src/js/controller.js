const refs = {
  button: document.querySelector(".addButton"),
  edit: document.querySelector(".request"),
  itemsWrapper: document.querySelector(".wrapper"),
  showFavoriteLink: document.querySelector(".favorite"),
  removeButton: document.querySelector(".remove")
};

export default class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;
    this.refs = refs;
    this.refs.button.addEventListener(
      "click",
      this.searchButtonClickHandler.bind(this)
    );
    this.refs.itemsWrapper.addEventListener(
      "click",
      this.itemClickHandler.bind(this)
    );
    this.refs.showFavoriteLink.addEventListener(
      "click",
      this.favoriteLinkHandler.bind(this)
    );
    this.refs.removeButton.addEventListener("click",this.deleteButtonHandler.bind(this));
  }

  searchButtonClickHandler(e) {
    e.preventDefault();
    this._model.getRequest(this.refs.edit.value).then(data => {
      this._view.display(data, this.refs.itemsWrapper);
    });
  }

  itemClickHandler(e) {
    e.preventDefault();
    const target = e.target;
    const nodeName = target.nodeName;
    const hasID = target.hasAttribute("data-id");
    if (nodeName !== "IMG" && !hasID) return;
    const dataID = target.dataset.id;
    this._model.addToFavorite(dataID);
    this.refs.edit.value=dataID;
  }

  favoriteLinkHandler(e) {
    e.preventDefault();
    this._view.display(this._model.getFavoriteList(), this.refs.itemsWrapper);
    this.refs.edit.value="";
  }

  deleteButtonHandler(e) {
    e.preventDefault();
    this._model.removeFromFavorite(this.refs.edit.value);
    this._view.display(this._model.getFavoriteList(), this.refs.itemsWrapper);
    this.refs.edit.value="";
  }
}
