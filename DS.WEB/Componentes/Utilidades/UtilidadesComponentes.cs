using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;

namespace DS.WEB.Componentes.Utilidades
{
    public static class UtilidadesComponentes
    {
        public static string ObtenhaDisplayName<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            MemberInfo member = ((MemberExpression)expression.Body).Member;

            DisplayAttribute atributoDisplay = (DisplayAttribute)member
                .GetCustomAttributes(typeof(DisplayAttribute), false)
                .FirstOrDefault();

            return atributoDisplay?.Name ?? member.Name;
        }

        public static List<SelectListItem> ObtenhaValoresEnum(Type type)
        {
            List<object> values = Enum.GetValues(type).Cast<object>().ToList();

            List<SelectListItem> list = new();
            foreach (object value in values)
            {
                MemberInfo memberInfo = type.GetMember(value.ToString()!).First();
                DisplayAttribute attribute = memberInfo.GetCustomAttribute<DisplayAttribute>();
                list.Add(new SelectListItem
                {
                    Text = attribute is not null ? attribute.Name : value.ToString(),
                    Value = ((int)value).ToString(),
                    Selected = true
                });
            }

            return list;
        }

        public static string ObtenhaName<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            string bodyExpressao = expression.Body.ToString();
            int posicaoAcessoMembro = bodyExpressao.IndexOf(".", StringComparison.Ordinal);
            string bodySemNomeParametro = bodyExpressao.Substring(++posicaoAcessoMembro);

            return Regex.Replace(bodySemNomeParametro, @"\(|\)", "");
        }
    }
}
