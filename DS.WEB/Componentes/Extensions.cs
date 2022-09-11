using DS.WEB.Componentes.Builders;
using DS.WEB.Componentes.Builders.Grid;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace DS.WEB.Componentes
{
    public static class Extensions
    {
        public static GridOptionsBuilder<TModel, TProperty> GridOptions<TModel, TProperty>(
        this IHtmlHelper<TModel> _, Expression<Func<TModel, IEnumerable<TProperty>>> expression)
        where TModel : class
        where TProperty : class
        {
            return new GridOptionsBuilder<TModel, TProperty>().Init(expression);
        }

        public static GridOptionsBuilder<TModel, IEnumerable<object>> Grid<TModel>(
        this IHtmlHelper<TModel> _, string id)
        where TModel : class
        {
            return new GridOptionsBuilder<TModel, IEnumerable<object>>().Init(id);
        }

        public static PesquisaBuilder Pesquisa<TModel, TProperty>(
        this IHtmlHelper<TModel> _, Expression<Func<TModel, TProperty>> expression)
        {
            return new PesquisaBuilder().Init(expression);
        }

        public static DropDownBuilder DropDownOptions<TModel, TProperty>(
        this IHtmlHelper<TModel> _, Expression<Func<TModel, TProperty>> expression, object itens = null)
        {
            return new DropDownBuilder(itens).Init(expression);
        }
    }
}
