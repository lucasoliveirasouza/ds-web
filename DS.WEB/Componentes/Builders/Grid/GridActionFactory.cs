﻿using DS.WEB.Componentes.ViewComponent.Grid;

namespace DS.WEB.Componentes.Builders.Grid
{
    public class GridActionFactory
    {
        private readonly GridAction _action;

        public GridActionFactory(GridAction action)
        {
            _action = action;
        }

        public GridActionFactory Remover()
        {
            Icon("fa fa-trash-alt")
                .DataRole("em-grid-remover")
                .Class("btn-outline-danger")
                .Title("Remover")
                .Tooltip("tooltip-danger");

            return this;
        }

        public GridActionFactory Editar()
        {
            Icon("fa fa-pen-to-square")
                .DataRole("em-grid-editar")
                .Class("btn-outline-primary")
                .Title("Editar")
                .Tooltip("tooltip-success");

            return this;
        }

        public GridActionFactory AdicionarAluno()
        {
            Icon("fa fa-users")
                .DataRole("em-grid-adicionar-aluno")
                .Class("btn-outline-info")
                .Title("Adicionar aluno")
                .Tooltip("tooltip-success");

            return this;
        }

        private GridActionFactory DataRole(string dataRole)
        {
            _action.DataRole = dataRole;

            return this;
        }

        public GridActionFactory Icon(string icone)
        {
            _action.Icon = icone;

            return this;
        }

        public GridActionFactory Class(string @class)
        {
            _action.Class = @class;

            return this;
        }

        public GridActionFactory Title(string title)
        {
            _action.Title = title;

            return this;
        }

        public GridActionFactory AoClicar(string aoClicar)
        {
            _action.AoClicar = aoClicar;

            return this;
        }

        public GridActionFactory Tooltip(string tooltip)
        {
            _action.Tooltip = tooltip;

            return this;
        }
    }
}
