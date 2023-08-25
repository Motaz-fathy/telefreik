import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import moment from "moment";
import React, { FC, Fragment, useEffect, useState } from "react";
import {
	DayPickerRangeController,
	FocusedInputShape,
	isInclusivelyAfterDay,
} from "react-dates";
import ButtonPrimary from "shared/Button/ButtonPrimary";

interface ModalSelectDateProps {
	onClose?: () => void;
	onSelectDate: (date: DateRage) => void;
	defaultValue: any;
	renderChildren?: (p: {
		defaultValue: DateRage;
		openModal: () => void;
	}) => React.ReactNode;
}

const ModalSelectDate: FC<ModalSelectDateProps> = ({
	defaultValue,
	onClose,
	onSelectDate,
	renderChildren,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [stateDate, setStateDate] = useState(defaultValue);
	const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
		useState<FocusedInputShape>("startDate");

	useEffect(() => {
		setStateDate(defaultValue);
	}, [defaultValue]);

	// FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
	//
	function closeModal() {
		setShowModal(false);
	}

	function openModal() {
		setShowModal(true);
	}

	const renderButtonOpenModal = () => {
		return renderChildren ? (
			renderChildren({ defaultValue, openModal })
		) : (
			<button onClick={openModal}>Select Date</button>
		);
	};

	return (
		<>
			{renderButtonOpenModal()}
			<Transition appear show={showModal} as={Fragment}>
				<Dialog
					as="div"
					className="HeroSearchFormMobile__Dialog relative z-50"
					onClose={closeModal}
				>
					<div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
						<div className="flex h-full">
							<Transition.Child
								as={Fragment}
								enter="ease-out transition-transform"
								enterFrom="opacity-0 translate-y-52"
								enterTo="opacity-100 translate-y-0"
								leave="ease-in transition-transform"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-52"
							>
								<Dialog.Panel className="relative flex h-full flex-1 flex-col justify-between overflow-hidden ">
									<>
										<div className="absolute left-4 top-4">
											<button
												className="focus:outline-none focus:ring-0"
												onClick={closeModal}
											>
												<XMarkIcon className="h-5 w-5 text-black dark:text-white" />
											</button>
										</div>

										<div className="flex flex-1 flex-col overflow-hidden p-1 pt-12">
											<div className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-neutral-800">
												<div className="flex flex-1 animate-[myblur_0.4s_ease-in-out] flex-col overflow-auto transition-opacity">
													<div className="p-5 ">
														<span className="block text-xl font-semibold sm:text-2xl">
															When's your trip?
														</span>
													</div>
													<div
														className={`relative z-10 flex flex-1 overflow-hidden`}
													>
														<DayPickerRangeController
															startDate={stateDate.startDate}
															endDate={stateDate.endDate}
															onDatesChange={date => {
																setStateDate(date);
																onSelectDate && onSelectDate(date);
															}}
															focusedInput={focusedInputSectionCheckDate}
															onFocusChange={focusedInput =>
																setFocusedInputSectionCheckDate(
																	focusedInput || "startDate",
																)
															}
															initialVisibleMonth={null}
															hideKeyboardShortcutsPanel={false}
															numberOfMonths={3}
															orientation="vertical"
															isOutsideRange={day =>
																!isInclusivelyAfterDay(day, moment())
															}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="flex justify-between border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
											<button
												type="button"
												className="flex-shrink-0 font-semibold underline"
												onClick={() => {
													setStateDate({
														startDate: moment(),
														endDate: moment().add(1, "days"),
													});
												}}
											>
												Clear dates
											</button>
											<ButtonPrimary
												sizeClass="px-6 py-3 !rounded-xl"
												onClick={() => {
													closeModal();
												}}
											>
												Save
											</ButtonPrimary>
										</div>
									</>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default ModalSelectDate;