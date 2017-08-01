import React, { Component } from 'react';
import './contentTable.css';

class ContentTable extends Component {

    constructor() {
        super();
        this.storage = window.localStorage;
        this.state = {
            sortColumnIndex: this.loadSorting('sortColumnIndex'),
            sortColumnType: this.loadSorting('sortColumnType')
        }
    }

    updateSorting = () => {
        this.setState({
            sortColumnIndex: this.loadSorting('sortColumnIndex'),
            sortColumnType: this.loadSorting('sortColumnType')
        });
    }

    saveSorting = (key, value) => {
        this.storage.setItem(key, value);
        this.updateSorting()
    }
    loadSorting = (key) => {
        return this.storage.getItem(key) ? this.storage.getItem(key) : 0;
    }

    toggleType() {
        return this.state.sortColumnType ? this.state.sortColumnType > 0 ? -1 : 1 : 1;
    }

    setIndexes(obj, index, array) {
        obj.index = index;
    }

    sortFunction = (a, b) => {
        if (a[this.loadSorting('sortColumnIndex')] > b[this.loadSorting('sortColumnIndex')]) {
            return 1 * this.state.sortColumnType;
        }
        if (a[this.loadSorting('sortColumnIndex')] < b[this.loadSorting('sortColumnIndex')]) {
            return -1 * this.state.sortColumnType;
        }
        return 0;
     }

    drawTable(table) {
        return (
            table.sort(this.sortFunction).map((obj, index) =>
                <li key={index} className="tableItem">
                    <div className="tableItem__index">{index}</div>
                    <div className="tableItem__brand">{obj.brand}</div>
                    <div className="tableItem__year">{obj.year}</div>
                    <div className="tableItem__weight">{Math.round(obj.weight)}</div>
                    <div className={obj.stock === true ?
                        "tableItem__stock tableItem__stock_full" :
                        "tableItem__stock tableItem__stock_empty"}>
                        {obj.stock === true ? 'Присутствует на складе' :
                            'Отсутствует на складе'}
                    </div>
                    <div className="tableItem__link">
                        <a href={obj.link} target="_blanc">Ссылка</a>
                    </div>
                    <div className={obj.rating > 0 ?
                        "tableItem__rating tableItem__rating_plus" :
                        "tableItem__rating tableItem__rating_minus"}>{obj.rating}</div>
                </li>
            )
        );
    }

    onClick = (event) => {
        this.saveSorting('sortColumnIndex', event.target.id);
        this.saveSorting('sortColumnType', this.toggleType());
    }

    render() {
        return (
            <div>
                <ul className="contentTable">
                    <li className="tableItem tableController">
                        <div className="tableItem__index">№</div>
                        <div onClick={this.onClick} id="brand" className="tableController__item tableItem__brand">Название</div>
                        <div onClick={this.onClick} id="year" className="tableController__item tableItem__year">Год выпуска</div>
                        <div onClick={this.onClick} id="weight" className="tableController__item tableItem__weight">Масса, т.</div>
                        <div className="tableItem__stock">Наличие на складе</div>
                        <div className="tableItem__link">Ссылка на обзор</div>
                        <div onClick={this.onClick} id="rating" className="tableController__item tableItem__rating">Рейтинг</div>
                    </li>
                </ul>
                <ul className="contentTable">
                    {this.drawTable(this.props.testTable)}
                </ul>
            </div>
        );
    }
}

export default ContentTable;