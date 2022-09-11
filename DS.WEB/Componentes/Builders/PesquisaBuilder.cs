using DS.WEB.Componentes.ViewComponent.Pesquisa;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace DS.WEB.Componentes.Builders
{
    public class PesquisaBuilder
    {
        private readonly PesquisaOptions _field = new();

        public PesquisaBuilder Init<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            MemberExpression memberExp = (MemberExpression)expression.Body;

            Type modelType = memberExp.Expression?.Type;
            if (modelType is not null)
            {
                MemberInfo memberInfo = modelType.GetMember(memberExp.Member.Name).FirstOrDefault();
                if (memberInfo is not null)
                {
                    _field.AspFor = string.Join(".", expression.Body.ToString().Split('.').Skip(1));
                    _field.TipoModel = ((PropertyInfo)memberInfo).PropertyType;

                    PropertyInfo[] propriedades = _field.TipoModel.GetProperties();
                    PropertyInfo propriedadeKey =
                        propriedades.FirstOrDefault(p => p.IsDefined(typeof(KeyAttribute), false));
                    _field.KeyName = propriedadeKey is not null ? propriedadeKey.Name : "";

                    string modelName = _field.TipoModel.Name.EndsWith("Model")
                        ? _field.TipoModel.Name.Substring(0, _field.TipoModel.Name.Length - 5)
                        : _field.TipoModel.Name;

                    _field.Action = $"Pesquise{modelName}";

                    DisplayAttribute displayAttribute = memberInfo.GetCustomAttribute<DisplayAttribute>();
                    _field.Label = displayAttribute is not null ? displayAttribute.Name is not null ? displayAttribute.Name : memberInfo.Name : memberInfo.Name;
                }
            }

            return this;
        }

        public PesquisaBuilder Action(string actionName, string method = "POST")
        {
            _field.Action = actionName;
            _field.Method = method;
            return this;
        }

        public PesquisaBuilder ParametrosPesquisa(string nomeFuncao)
        {
            _field.ParametrosPesquisa = nomeFuncao;
            return this;
        }

        public PesquisaBuilder EhPesquisaServerSide()
        {
            _field.EhPesquisaServerSide = true;
            return this;
        }

        public PesquisaBuilder FiltrarPor(string propriedade)
        {
            _field.FiltrarPor = propriedade;
            return this;
        }

        public PesquisaBuilder AoSelecionar(string nomeFuncao)
        {
            _field.AoSelecionar = nomeFuncao;
            return this;
        }

        public PesquisaBuilder AoApagar(string evento)
        {
            _field.AoApagar = evento;

            return this;
        }

        public PesquisaOptions Build()
        {
            return _field;
        }
    }
}
