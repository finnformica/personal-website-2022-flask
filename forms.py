from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField, SelectField
from wtforms.validators import DataRequired, NumberRange

class BitcoinRiskForm(FlaskForm):
    period = IntegerField('SMA Period',
                            validators=[DataRequired(), NumberRange(min=2, max=60)],
                            default='14')
    candles = SelectField('Candles',
                            validators=[DataRequired()],
                            choices=['Daily', 'Weekly', 'Monthly'],
                            default='Weekly')

    submit = SubmitField('Submit')
