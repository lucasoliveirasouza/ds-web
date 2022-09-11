using DS.WEB.Componentes.ViewComponent.DropDown;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace DS.WEB.Componentes.Builders
{
    public class DropDownBuilder
    {
        private DropDownOptions Field { get; set; }

        private string DefaultMessage { get; }

        public DropDownBuilder(object itens)
        {
            DefaultMessage = "Selecione um item..";
            Field = new DropDownOptions
            {
                Itens = itens
            };
        }

        public DropDownBuilder Init<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            MemberExpression memberExp = (MemberExpression)expression.Body;

            Type modelType = memberExp.Expression?.Type;
            if (modelType is not null)
            {
                MemberInfo memberInfo = modelType.GetMember(memberExp.Member.Name).FirstOrDefault();
                if (memberInfo is not null)
                {
                    Field.AspFor = string.Join(".", expression.Body.ToString().Split('.').Skip(1));

                    DisplayAttribute displayAttribute = memberInfo.GetCustomAttribute<DisplayAttribute>();
                    if (displayAttribute is not null)
                    {
                        Field.DefaultSelectMessage = displayAttribute.Description is not null
                            ? displayAttribute.Description
                            : DefaultMessage;
                        Field.Label = displayAttribute.Name is not null ? displayAttribute.Name : memberInfo.Name;
                    }
                    else
                    {
                        Field.Label = memberInfo.Name;
                        Field.DefaultSelectMessage = DefaultMessage;
                    }

                    Type propertyType = ((PropertyInfo)memberInfo).PropertyType;
                    if (propertyType.IsGenericType && Equals(propertyType.GetGenericTypeDefinition(), typeof(List<>)))
                    {
                        propertyType = propertyType.GetGenericArguments()[0];
                    }

                    if (propertyType.GetInterfaces().Where(i => i.Name.Contains("IEnumeradorSeguro")).Any())
                    {
                        Field.Params = new object[] { propertyType };
                        return this;
                    }

                    if (propertyType.IsEnum)
                    {
                        Field.TipoEnumerador = propertyType;
                    }
                }
            }

            return this;
        }

        public DropDownBuilder AoSelecionar(string aoSelecionar)
        {
            Field.AoSelecionar = aoSelecionar;
            return this;
        }

        public DropDownBuilder ClassList(params string[] classList)
        {
            Field.ClassList = classList.ToList();
            return this;
        }

        public DropDownBuilder RemovaDefaultMessage()
        {
            Field.DefaultSelectMessage = "";
            return this;
        }

        public DropDownOptions Build()
        {
            return Field;
        }
    }
}
