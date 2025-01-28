import {SharedUi} from '@shared';
import {Actions} from './ui';
import Style from './style.module.scss';

type ConfirmDeleteProps = {
  params: Promise<{id: string}>;
};

export default async function ConfirmDeleteModal({params}: ConfirmDeleteProps) {
  const id = (await params).id;
  return (
    <SharedUi.ModalTemplate>
      <div className={Style.modalContainer}>
        <div className={Style.textContainer}>
          <h3>Подтвердите действие</h3>
          <p>Вы действительно хотите удалить пользователя под №{id}</p>
        </div>
        <div className={Style.actions}>
          <Actions userId={id} />
        </div>
      </div>
    </SharedUi.ModalTemplate>
  );
}
