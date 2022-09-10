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
    }
}
